import FormRegister from '@/components/FormRegister/indexC';
import SubHeader from '@/components/SubHeader';

function ConsultantRegisterInitialPage() {
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

export default ConsultantRegisterInitialPage;
