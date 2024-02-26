import '../styles/LoginForm.css'

export const LoginForm = () => {
  return (
    <div className="login-form">
      <h1>Login</h1>
      <form>
        <input type="text" autoComplete='' placeholder="Username" />
        <input type="password" autoComplete='' placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
