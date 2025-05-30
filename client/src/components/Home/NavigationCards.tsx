import DisplayFiles from "../Files/DisplayFilesCard"
import UploadForm from "../Files/UploadForm"

const NavigationCards = () => {
  return (
    <div>
      <div className="flex gap-10 justify-center">
        <UploadForm/>
        <DisplayFiles/>
      
      </div>
    </div>
  )
}

export default NavigationCards
