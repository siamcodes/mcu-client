import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import renderHTML from 'react-render-html';
import { useSelector, useDispatch } from "react-redux";
import UserNav from "../../components/nav/UserNav";
import { getProfile, saveContact } from "../../functions/user";

const Contact = () => {
    //redux
    const { user } = useSelector((state) => ({ ...state }));
    //state
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setTitle();
        setDescription();
    }, []);

    const titleFromLS = () => {
        if (typeof window === 'undefined') {
            return false;
        }
        if (localStorage.getItem('title')) {
            return JSON.parse(localStorage.getItem('title'));
        } else {
            return false;
        }
    };
    const [title, setTitle] = useState(titleFromLS);

  /*   const descriptionFromLS = () => {
        if (typeof window === 'undefined') {
            return false;
        }
        if (localStorage.getItem('description')) {
            return JSON.parse(localStorage.getItem('description'));
        } else {
            return false;
        }
    }; */
    const [description, setDescription] = useState(false);


    const saveContactToDB = () => {
        saveContact( title, description).then((res) => {
            if (res.data.ok) {
               // setLoading(false);
                setTitle(true);
                setDescription(true);
                toast.success("content saved");
                //history.push(`/admin/product/${slug}`);
            }
        });

    };

    const handleContact = (e) => {
        console.log(e);
       /*  setTitle(e);
        setDescription(e);
        if (typeof window !== 'undefined') {
           localStorage.setItem(`title`, JSON.stringify(e));
        }  */
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>

                <div className="col-md-10">
                    <h4>ติดต่อสอบถาม / แจ้งปัญหาการใช้งาน</h4>
                    <form >
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        className="form-control"
                                        value={title}
                                        onChange={handleContact}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                rows="5"
                                type="text"
                                name="description"
                                className="form-control"
                                value={description}
                                onChange={handleContact}
                            />
                        </div>
                        <button className="btn btn-outline-info btn-lg" onClick={saveContactToDB}>SEND</button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Contact;
