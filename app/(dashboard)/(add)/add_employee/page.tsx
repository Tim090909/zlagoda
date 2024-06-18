import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import AddEmployeeForm from './form';

const CreatePage = async () => {
    const session = await getServerSession(options);
    const role = session?.user?.role;

    if (role !== "manager") {
        redirect("/");
    }

    return <AddEmployeeForm />;
};

export default CreatePage;


