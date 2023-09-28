import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase/config'

const useFetchUser = (collectionuser) => {
    let [users, setUsers] = useState([])
    let [isLoading, setIsLoading] = useState(false)
    let getCollection = () => {
        setIsLoading(true)
        try {
            let docRef = collection(db, collectionuser)
            const q = query(docRef, orderBy('createdAt', 'desc'))
            onSnapshot(q, (snapshot) => {
                const allData = snapshot.docs.map(doc => (
                    { id: doc.id, ...doc.users() }

                ))
                setUsers(allData)
                setIsLoading(false)
            })
        } catch (error) {
            setIsLoading(false)
        }


    }

    useEffect(() => {
        getCollection()
    }, [])

    return (
        { users, isLoading }
    )
}

export default useFetchUser
