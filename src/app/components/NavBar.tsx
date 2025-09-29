import LangSelect from "./LangSelect"

export default function NavBar() {
  return (
    <div className="flex w-full h-10 bg-gray-200">
      <div className="w-1/2"></div>
      <div className="flex justify-end w-1/2 p-2">
          <LangSelect />
      </div>
    </div>
  )
}