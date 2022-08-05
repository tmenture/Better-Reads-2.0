import React from 'react';

export default function Login() {
  return (
    <div>
      <h1>Login Page</h1>
      <form className="form py-2">
        <input
          //value={username}
          name="username"
          //onChange={}
          type="username"
          placeholder="username"
        />
        <input
          //value={password}
          name="password"
          //onChange={}
          type="password"
          placeholder="password"
        />
        <button type="button" //onClick
        >
        Log In
        </button>
      </form>
    </div>
  );
}
