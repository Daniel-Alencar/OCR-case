import FormRegister from '@/components/FormRegister';
import SubHeader from '@/components/SubHeader';

function Register() {
  return (
    <>
      <div className='h-6'></div>
      <SubHeader />
      <div className='flex flex-col justify-center items-center'>
        <FormRegister />
      </div>
    </>
  );
}

export default Register;
