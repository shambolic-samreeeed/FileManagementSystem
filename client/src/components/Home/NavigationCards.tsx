import CreateFolder from "../Files/CreateFolder"
import DisplayFiles from "../Files/DisplayFilesCard"
import UploadForm from "../Files/UploadForm"

const NavigationCards = () => {
  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="flex flex-col gap-10">
        <UploadForm />
        <DisplayFiles />
        <CreateFolder />
      </div>
    </div>
  );
};

export default NavigationCards;
