import React from 'react';

export default function Signup() {
  return (
    <div>
      <h1>Create Your Account</h1>
      <h4>
        fill out the fields below to start using Better Reads!
      </h4>
      <form className="form py-2">
        <input
          //value={email}
          name="email"
          //onChange={}
          type="email"
          placeholder="email"
        />
        <input
          //value={password}
          name="password"
          //onChange={}
          type="password"
          placeholder="password"
        />
        <input
          //value={username}
          name="username"
          //onChange={}
          type="username"
          placeholder="username"
        />
        <button type="button" //onClick
        >
        Sign Up
        </button>
      </form>
    </div>
  );
}
