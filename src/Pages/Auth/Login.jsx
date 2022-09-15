import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [enteredEmail, setEnteredEmail] = useState({});

  useEffect(() => {
    if (enteredEmail?.email) {
      navigate('/');
    }
  }, [enteredEmail, navigate]);
  return (
    <>
      <section>
        <article className="flex flex-col items-center justify-center px-4 mt-[1.5rem] md:mt-[40px]">
          <div
            style={{
              boxShadow: 'rgb(228 232 247 / 80%) 0px 0px 24px',
            }}
            className="bg-primaryWhite rounded-2xl px-[32px] py-[24px] md:px-auto md:pt-[66px] md:pb-[80px] mdLg800:px-[160px] w-full md:w-[640px] mdLg800:w-[800px] mx-auto text-center"
          >
            {/* heading  */}
            <h4 className="text-[1.4375rem] md:text-[2.215rem] font-[700] mb-[19px] tracking-tight">
              Welcome to RUET Clearance System
            </h4>

            {/* email form section  */}
            {/* <EmailForm setEnteredEmail={setEnteredEmail} btnTitle="Log In" /> */}
          </div>
        </article>
      </section>
    </>
  );
};

export default Login;
