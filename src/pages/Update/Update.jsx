import React, { useEffect, useState } from 'react'

import toast, { Toaster } from 'react-hot-toast'
import { db } from "../../firebase"
import {getDoc, doc, updateDoc } from 'firebase/firestore'
import { useNavigate, useParams } from 'react-router-dom'

const Create = () => {

    const [user, setUser] = useState({
        name: "",
        join: "",
        status: ""
    })

    const updateUser = async ()=>{
        try {
            const ref = doc(db, "users", id)
            await updateDoc(ref,user)
            toast.success("user updated successfully")
            setTimeout(()=>navigate("/users"),1000)
            
        } catch (error) {
            console.log(error)
            toast.error("something went wrong")
        }

    }

    const navigate = useNavigate()
    const { id } = useParams()

    const getUser = async () => {
        try {
            const ref = doc(db, "users", id)
            let user = await getDoc(ref)
            setUser(user.data())
        } catch (error) {
            console.log(error)
            toast.error("something went wrong")
        }
    }

    const handleData = e => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    useEffect(() => {
        getUser()
    }, [])


    return (
        <div className='create'>
            <Toaster />
            <div className="form">
                <h1>Update user</h1>

                <div className="input">
                    <input type="text" value={user.name} onChange={(e) => handleData(e)} name="name" id="" placeholder='Username' required />
                </div>
                <div className="input">
                    <input type="date" value={user.join} onChange={(e) => handleData(e)} name="join" id="" placeholder='Join Date' required />
                </div>
                <div className='status'>
                    <div>
                        <input type="radio" name="status" onChange={(e) => handleData(e)} value={"active"} id="active" checked={user.status == "active"} hidden />
                        <label htmlFor='active'>Active</label>
                    </div>
                    <div>
                        <input type="radio" onChange={(e) => handleData(e)} value={"inactive"} name="status" id="inactive" checked={user.status == "inactive"} hidden />
                        <label htmlFor='inactive'>In-Active</label>
                    </div>
                </div>
                <div className="center">
                    <button onClick={updateUser}>Update</button>
                </div>

            </div>
        </div>


    )
}

export default Create
