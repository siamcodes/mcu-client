import axios from "axios";

export const getGenerations = async () =>
    await axios.get(`${process.env.REACT_APP_API}/generations`);

export const getGeneration = async (slug) =>
    await axios.get(`${process.env.REACT_APP_API}/generation/${slug}`);

export const removeGeneration = async (slug, authtoken) =>
    await axios.delete(`${process.env.REACT_APP_API}/generation/${slug}`, {
        headers: {
            authtoken,
        },
    });

export const updateGeneration = async (slug, generation, authtoken) =>
    await axios.put(`${process.env.REACT_APP_API}/generation/${slug}`, generation, {
        headers: {
            authtoken,
        },
    });

export const createGeneration = async (generation, authtoken) =>
    await axios.post(`${process.env.REACT_APP_API}/generation`, generation, {
        headers: {
            authtoken,
        },
    });
