import React, { useEffect, useState } from 'react'
import useFetchUser from '../../customHooks/useFetchUser'
import { useDispatch } from 'react-redux'
import Loader from '../Loader'
import { Link } from 'react-router-dom'
import { FaPenAlt, FaPenFancy, FaTrashAlt } from 'react-icons/fa'


const ViewUsers = () => {

    let { users, isLoading } = useFetchUser("users")
    console.log(users)
    let dispatch = useDispatch()

    useEffect(() => {

    })




    return (
        <div>
            {isLoading && <Loader />}
            <h1>View Users</h1>
            <hr />

            <table class="table table-bordered border-info">
                <thead>
                    <tr>
                        <th scope="col">SrNo</th>
                        <th scope="col">UserName</th>
                        <th scope="col">Email</th>
                        <th scope="col">Mobile No</th>
                        <th scope="col">Password</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>

                    <tr>
                        <th>0</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <button type="button" class="btn btn-success "> <FaPenAlt/> </button>
                            <button type="button" class="btn btn-danger ms-2"> <FaTrashAlt/> </button>

                        </td>

                    </tr>

                </tbody>
            </table>

        </div>
    )
}

export default ViewUsers

