import axios from "axios"
import { User } from "../interfaces"
class UserService{
	public getUsers=async()=>{
		const result= await axios.get("http://localhost:3000/users")
		return result.data
	}
	public deleteUser=async (id:number) => {
		try{
			const result= await axios.delete(`http://localhost:3000/users/${id}`)
			return result.status
		}
		catch(ex){
			console.log(ex);
		}
	}
	public addUser= async(data:User)=>{
		const result= await axios.post('http://localhost:3000/users/',data)
		return result
	}
	public editUser= async(id:number,data:User)=>{
		const result= await axios.put(`http://localhost:3000/users/${id}`,data)
		return result
	}
}

export default UserService