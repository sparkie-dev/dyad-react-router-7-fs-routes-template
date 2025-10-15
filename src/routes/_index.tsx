import { MadeWithSparkie } from "@/components/made-with-sparkie";

export async function loader() {
  return {"hello": "world"};
}

export function Component() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your Blank App</h1>
        <p className="text-xl text-gray-600">
          Start building your amazing project here!
        </p>
      </div>
      <MadeWithSparkie />
    </div>
  );
};

export default Component;

