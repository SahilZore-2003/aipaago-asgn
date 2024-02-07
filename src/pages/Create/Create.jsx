import React, { useState } from 'react'
import "./Create.scss"
import toast, { Toaster } from 'react-hot-toast'
import { db } from "../../firebase"
import { addDoc, collection } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const Create = () => {
    const [user, setUser] = useState({
        name: "",
        join: "",
        status: ""
    })

    const navigate = useNavigate()

    const handlecreateUser = async () => {
        if (user.name == "" || user.join == "" || user.status == "") return toast.error("please fill all information.")

        try {
            const ref = collection(db, "users")
            await addDoc(ref, user)
            toast.success("data added successfully")
            setUser({
                name: "",
                join: "",
                status: ""
            })

            setTimeout(() => {
                navigate("/users")
            }, 1000)


        } catch (error) {
            console.log(error)
            toast.error("something went wrong")
        }


    }


    const handleData = e => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <div className='create'>
            <Toaster />
            <div className="form">
                <h1>create user</h1>

                <div className="input">
                    <input type="text" onChange={(e) => handleData(e)} name="name" id="" placeholder='Username' required />
                </div>
                <div className="input">
                    <input type="date" onChange={(e) => handleData(e)} name="join" id="" placeholder='Join Date' required />
                </div>
                <div className='status'>
                    <div>
                        <input type="radio" name="status" onChange={(e) => handleData(e)} value={"active"} id="active" hidden />
                        <label htmlFor='active'>Active</label>
                    </div>
                    <div>
                        <input type="radio" onChange={(e) => handleData(e)} value={"inactive"} name="status" id="inactive" hidden />
                        <label htmlFor='inactive'>In-Active</label>
                    </div>
                </div>
                <div className="center">
                    <button onClick={handlecreateUser}>Create</button>
                </div>

            </div>
        </div>


    )
}

export default Create
