import { ChangeEvent, FunctionComponent, useRef } from "react";

interface FileUploadProps {
    handleOnselect: (e: FileList | null) => void
}
 
const FileUpload: FunctionComponent<FileUploadProps> = ({handleOnselect}) => {
    const fileInputField = useRef<null>(null)
    return (
        <input type="file" onChange={(e: ChangeEvent) => handleOnselect((e?.target as HTMLInputElement)?.files)} ref={fileInputField} />
    );
}
 
export default FileUpload;