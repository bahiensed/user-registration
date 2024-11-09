import UserForm from "@/components/forms/User";

export default function Home() {
  return (
    <div className='border border-blue-500 flex flex-col w-full px-8 py-4'>
      <UserForm />
    </div>
  );
}
