import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function UserForm() {
  const [errors, setErrors] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  async function onFormSubmitted(data) {
    setErrors([]);

    try {
      await axios.post("http://localhost:3001/users", data);
      reset();
    } catch (e) {
      if (e.response && e.response.data) {
        setErrors(e.response.data);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmitted)} method="GET">
      {errors.map((error) => (
        <p>{error.message}</p>
      ))}

      <img src="" alt="Avatar" />

      <label htmlFor="email">Email</label>
      <input type="email" {...register("email", { required: true })} />

      <label htmlFor="username">Username</label>
      <input {...register("username", { required: true })} />

      <label htmlFor="password">Password</label>
      <input type="password" {...register("password", { required: true })} />

      <label htmlFor="avatar">Avatar</label>
      <input {...register("avatar")} />

      <button type="submit">Save</button>
    </form>
  );
}
