import { ChangeEvent, FunctionComponent, useRef } from "react";

type FileUploadProps = {
  handleOnselect: (e: FileList | null) => void;
} & React.HTMLProps<HTMLInputElement>;

const FileUpload: FunctionComponent<FileUploadProps> = ({
  handleOnselect,
  ...props
}) => {
  const fileInputField = useRef<null>(null);
  return (
    <input
      {...props}
      type="file"
      onChange={(e: ChangeEvent) =>
        handleOnselect((e?.target as HTMLInputElement)?.files)
      }
      ref={fileInputField}
    />
  );
};

export default FileUpload;
