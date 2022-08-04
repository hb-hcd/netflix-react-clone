import { PlusIcon, XIcon } from "@heroicons/react/solid"
import { ThumbUpIcon, VolumeOffIcon, VolumeUpIcon } from "@heroicons/react/outline"
import MuiModal from "@mui/material/Modal"
import { useEffect, useState } from "react"
import ReactPlayer from "react-player"
import { useRecoilState, useRecoilValue } from "recoil"
import { modalState, movieState } from "../atoms/modalAtom"
import { Movie, Element, Genre } from "../typings"
import { FaPlay, FaPlus } from 'react-icons/fa'

const Modal = () => {
    const [showModal, setShowModal] = useRecoilState(modalState)
    const [movie, setMovie] = useRecoilState(movieState)
    const [trailer, setTrailer] = useState("")
    const [genre, setGenre] = useState<Genre[]>([])
    const [muted, setMuted] = useState(false)
    const handleClose = () => {
        setShowModal(false)
        setMovie(null)
    }


    console.log(movie);


    //runs every time when movie changes
    useEffect(() => {
        if (!movie) return

        //fetch a single movie 
        async function fetchMovie() {
            const data = await fetch(
                `https://api.themoviedb.org/3/${movie?.media_type === 'tv' ? 'tv' : 'movie'
                }/${movie?.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY
                }&language=en-US&append_to_response=videos`
            ).then(res => res.json())
            if (data?.videos) {
                //if data is not null, set trailer
                const index = data.videos.results.findIndex((element: Element) => element.type === "Trailer")
                setTrailer(data.videos.results[index]?.key)
            }
            if (data?.genres) {
                setGenre(data.genres)
            }
        }
        fetchMovie()
    }, [movie])

    return (
        <MuiModal open={showModal} onClose={handleClose}
            className="fixed !top-7 z-50 left-0 right-0 mx-auto  max-w-5xl overflow-y-scroll rounded-md scrollbar-hide"
        >
            <>
                <button onClick={handleClose}
                    className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 bg-[#181818] border-none hover:bg-[#181818]">
                    <XIcon className="H-6 w-6 " />
                </button>
                <div className="relative pt-[56.25%]">
                    <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${trailer}`}
                        width="100%"
                        height="100%"
                        style={{ position: "absolute", top: "0", left: "0" }}
                        playing
                        muted={muted}
                    // controls
                    />
                    <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
                        <div className="flex space-x-2">
                            <button className="flex items-center gap-x-2 rounded bg-white text-black transition hover:bg-[#e6e6e6] px-8">
                                <FaPlay className="w-7 h-7 text-black" />
                                Play
                            </button>
                            <button className="modalButton">
                                <PlusIcon className=" w-7 h-7" />
                            </button>
                            <button className="modalButton">
                                <ThumbUpIcon className=" w-7 h-7" />
                            </button>
                            <button onClick={() => setMuted(!muted)}>
                                {muted ?
                                    <VolumeOffIcon className=" w-7 h-7" /> : <VolumeUpIcon className=" w-7 h-7" />
                                }
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex space-x-16 bg-[#181818] rounded-b-md px-10 py-8">
                    <div className="space-y-6 text-lg">
                        <div className="flex items-center space-x-2 text-sm">
                            <p className="text-green-400 font-semibold">{(movie?.vote_average * 10).toFixed()}% Match</p>
                            <p className="font-light">{movie?.release_date || movie?.first_air_date}</p>
                            <div className="flex h-4 items-center justify-center rounded border border-white/40 text-xs py-2 px-1.5">HD</div>
                        </div> 
                        <div className="flex flex-col gap-x-10 gap-y-4 text-sm font-light md:flex-row">
                            <p className="w-5/6">{movie?.overview}</p>
                            <div className="flex flex-col space-y-3 text-sm">
                                <div>
                                    <span className="text-[gray]">Genres: </span>
                                    {genre.map(item=>item.name).join(", ")}
                                </div>
                                <div>
                                    <span className="text-[gray]">Original language: </span>
                                    {movie?.original_language[0].toUpperCase()+movie?.original_language.slice(1)} 
                                </div>
                                <div>
                                    <span className="text-[gray]">Total votes:  </span>
                                    {movie?.vote_count} 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </MuiModal>
    )
}

export default Modal