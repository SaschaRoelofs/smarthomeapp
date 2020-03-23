import React, { useState, useEffect } from 'react'
import axios from 'axios';

const post = (url, page, body, run, error) => {
    axios.post(url + page, body).then(run).catch(error);
}