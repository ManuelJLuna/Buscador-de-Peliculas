import { useState } from 'react'
import './appStyle.css'

export const App = () => {

    const URL_BASE = 'https://api.themoviedb.org/3/search/movie'
    const API_KEY = 'b201396f87296d18904191a1eb9cfe67'

    const [search, setSearch] = useState('')
    const [movie, setMovie] = useState(null)


    const handleInputChange = (event) => {
        setSearch(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        if (search.trim() == '') { return console.error('Debes ingresar una pelicula. App.jsx 16') }
        fetchMovies()
    }

    const fetchMovies = async () => {
        try {
            const r = await fetch(`${URL_BASE}?query=${search}&api_key=${API_KEY}&language=es-ES`)
            const data = await r.json()
            setMovie(data.results)
        } catch (err) {
            console.error(err)
            console.error('Ha ocurrido un error al llamar a la API. App.jsx 22')
        }
    }

    return (
        <>
            <div className='mainContainer'>

                <h1 className='mainTitle'>Buscador de peliculas</h1>

                <form onSubmit={handleSubmit}>
                    <input type="text" autoFocus autoComplete='false' placeholder='Escriba el titulo de la pelicula que desee buscar' value={search} onChange={handleInputChange} />
                    <button type="submit">Buscar</button>
                </form>

                {
                    movie &&

                    <div id='movieList'>
                        {movie.map(movie => (
                            <div key={movie.id} className='movieContainer'>
                                <img className='poster' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.original_title} />
                                <h2>{movie.title}</h2>
                                <h4>Populariudad: {Math.floor(movie.popularity)}%</h4>
                                <p>{movie.overview}</p>
                            </div>
                        ))}
                    </div>

                }

            </div>
        </>
    )
}
