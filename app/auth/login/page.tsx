import { getServerSession } from 'next-auth'
import LoginForm from './form'
import { redirect } from 'next/navigation';

const LoginPage = async () => {
  const session = await getServerSession();
  if(session){
    redirect("/");
  }
  console.log("ok");
  return (
    <LoginForm />
  )
}

export default LoginPage
