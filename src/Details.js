import { React, useState, useEffect } from 'react'
import axios from 'axios';
import './details.css'
import { useLocation } from 'react-router-dom';

function Details(props) {
    const location = useLocation();
    let data = location.state.data;
    console.log(location);
    return (
        <div className="anime_details">
            <h1>Anime Details</h1>
            <h1>Title</h1><h3>{data.titles.en}</h3>
            <h1>Description</h1><h3>{data.descriptions.en}</h3>
            <h1>Genres</h1><h3>{data.genres.toString()}</h3>
            <h1>Trailer Url</h1><h3><a href={data.trailer_url.toString()}>{data.trailer_url.toString()}</a></h3>
            <h1>Episodes</h1><h3>{data.episodes_count}</h3>
            <h1>Season Year</h1><h3>{data.season_year}</h3>

        </div>
    );
}

export default Details;