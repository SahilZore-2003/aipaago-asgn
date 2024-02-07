import React, { useEffect, useState } from 'react'
import "./Users.scss"
import { TiDeleteOutline } from "react-icons/ti";
import { TfiWrite } from "react-icons/tfi";
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from "../../firebase"
import Loader from "../../components/Loader/Loader"
import toast, { Toaster } from 'react-hot-toast';
const Users = () => {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const deleteUser = async (id) => {
        const ref = doc(db, "users", id)
        await deleteDoc(ref)
        toast.error("user deleted successfully")
        getData()
    }

    const getData = async () => {
        try {
            setLoading(true)
            const ref = collection(db, "users")
            const data = await getDocs(ref)
            setData(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
            setLoading(false)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])


    return (
        <>
            <Toaster />
            {
                loading ? (<Loader />) : (<div className='users'>
                    <div className="container">

                        <h2><span>My Users</span > <button onClick={() => navigate("/create")}>Create New</button> </h2 >
                        {
                            data.length < 1 ? <p className='empty'>user list is empty please create users..</p> : <table style={{ overflowX: "scroll" }}>
                                <thead>
                                    <tr>
                                        <th>sr</th>
                                        <th>username</th>
                                        <th>join date</th>
                                        <th>status</th>
                                        <th>action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((data, index) => {
                                            return (
                                                <tr key={data.id}>
                                                    <td>{++index}</td>
                                                    <td>{data.name}</td>
                                                    <td>{data.join}</td>
                                                    <td><span className={data.status}>{data.status}</span></td>
                                                    <td className='actions'>
                                                        <button onClick={() => navigate(`/update/${data.id}`)} className='update'><TfiWrite /></button>
                                                        <button onClick={() => deleteUser(data.id)} className='delete'><TiDeleteOutline /></button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                        }



                    </div >
                </div >)
            }
        </>

    )
}

export default Users
