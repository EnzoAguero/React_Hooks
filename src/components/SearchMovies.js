import React, {useState,useEffect} from 'react';

/* import noPoster from '../assets/images/no-poster.jpg'; */

function SearchMovies(){

	const [movies, setMovies] = useState([]) 
	const [keyword,setKeyword] = useState('') /* string vacio porque empieza buscando nada */ 

	/* useState tiene dos parametros, uno es donde inicia el estado que es 0, y el segundo es una funcion que en este caso como el estado inicia en 0 
	cuando se escribe algo en el input, ese estado toma el valor de lo que se escribio en el input que es lo que yo puse en la funcion de abajo*/

	const SearchMovies = e => {
		e.preventDefault()
		setKeyword(e.target.search.value) /* tomo el valor del input */
	}

	// Credenciales de API
	const apiKey = 'd9746552'; // Intenta poner cualquier cosa antes para probar

	useEffect(()=>{
		console.log('Monto el componente');
	},[])

	useEffect(async () => {
		if (keyword) {
			try {
			
			let response = await fetch(`https://www.omdbapi.com/?s=${keyword}&apikey=${apiKey}`) /* cuando se escribe algo en el input, cambia el estado de keyword que es lo que esta en esta url y dispara este metodo useEffect */
			let result = await response.json()
			setMovies(result.Search)

		} catch (error) {
			console.log(error);			
		}
	}

	},[keyword] )

	

	return(
		<div className="container-fluid">
			{
				apiKey !== '' ?
				<>
					<div className="row my-4">
						<div className="col-12 col-md-6">
							{/* Buscador */}
							<form method="GET" onSubmit={SearchMovies}>
								<div className="form-group">
									<label htmlFor="">Buscar por título:</label>
									<input type="text" className="form-control" name="search" />
								</div>
								<button className="btn btn-info">Search</button>
							</form>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<h2>Películas para la palabra: {keyword}</h2>
						</div>
						{/* Listado de películas */}
						{
							movies.length > 0 && movies.map((movie, i) => {
								return (
									<div className="col-sm-6 col-md-3 my-4" key={i}>
										<div className="card shadow mb-4">
											<div className="card-header py-3">
												<h5 className="m-0 font-weight-bold text-gray-800">{movie.Title}</h5>
											</div>
											<div className="card-body">
												<div className="text-center">
													<img 
														className="img-fluid px-3 px-sm-4 mt-3 mb-4" 
														src={movie.Poster}
														alt={movie.Title} 
														style={{ width: '90%', height: '400px', objectFit: 'cover' }} 
													/>
												</div>
												<p>{movie.Year}</p>
											</div>
										</div>
									</div>
								)
							})
						}
					</div>
					{ movies.length === 0 && <div className="alert alert-warning text-center">No se encontraron películas</div>}
				</>
				:
				<div className="alert alert-danger text-center my-4 fs-2">Eyyyy... ¿PUSISTE TU APIKEY?</div>
			}
		</div>
	)
}

export default SearchMovies;
