import { React, useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

function Home(props) {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [key, setKey] = useState('genre');
    const [pageCount, setPageCount] = useState({ currentPage: 0, offset: 100 });
    useEffect(() => {
        axios.get("https://api.aniapi.com/v1/anime" + "?" + key + "=" + search)
            .then((response) => {
                let temp_data = response.data.data.documents;
                setData(response.data.data.documents);
                let search_key = ['genres', 'titles'];
                console.log(temp_data);
                // let res_data = temp_data.map(element => {
                //     let genres = element.genres;
                //     let titles = element.titles;
                //     console.log(genres);
                //     console.log(titles);

                // })
            })
            .catch((error) => {
                console.log(error);
            })
        console.log("test");
    }, []);
    function getResult(inp) {
        axios.get("https://api.aniapi.com/v1/anime" + "?" + key + "=" + inp)
            .then((response) => {
                let temp_data = response.data.data.documents;
                setData(response.data.data.documents);
                let search_key = ['genres', 'titles'];
                console.log(temp_data);
                let res_data = temp_data.map(element => {
                    let genres = element.genres;
                    let titles = element.titles;

                    console.log(genres);
                    console.log(titles);

                }
                )
            })
            .catch((error) => {
                console.log(error);
            })
    }
    let finalData = data.sort(() => Math.random() - 0.5)
    let res_data =
        (data !== undefined) ? finalData.map(element => {
            return <li>
                <div>

                    <Link to={{ pathname: "/" + element.id, state: { data: element } }}>{element.titles.en}<img src={element.cover_image} alt="anime" /></Link>

                </div>
            </li>
        }) : <></>
    console.log(res_data);

    function receivedData(inp, page) {
        axios
            .get("https://api.aniapi.com/v1/anime" + "?" + page + "=" + inp + "&&" + key + "=" + inp)
            .then((response) => {
                let temp_data = response.data.data.documents;
                setData(response.data.data.documents);
                let search_key = ['genres', 'titles'];
                console.log(temp_data);
                let res_data = temp_data.map(element => {
                    let genres = element.genres;
                    let titles = element.titles;

                    console.log(genres);
                    console.log(titles);

                }
                )
            })
            .catch((error) => {
                console.log(error);
            })
    }



    let handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        setPageCount({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            receivedData(search, selectedPage)
        });

    };


    return (
        <div>
            <h1>React Api</h1>

            <select placeholder="Search By" onChange={(e) => { console.log(e.target.value); setKey(e.target.value); }}>
                <option value="genre">Genre</option>
                <option value="title">Title</option>
                <option value="description">Description</option>
            </select>
            <input type="text" onChange={(e) => { console.log(e.target.value); setSearch(e.target.value); getResult(e.target.value); }}></input>

            <div>
                <h1>Anime List</h1>
                {res_data}


            </div>

            <div>
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"} />
            </div>
        </div>
    )
}

export default Home
