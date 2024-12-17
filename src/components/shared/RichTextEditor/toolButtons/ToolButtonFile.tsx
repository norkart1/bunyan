import { TbFile } from 'react-icons/tb';
import ToolButton from './ToolButton';
import type { ToolButtonProps } from './ToolButton';
import type { BaseToolButtonProps } from './types';

type ToolButtonFileProps = BaseToolButtonProps & ToolButtonProps;

const ToolButtonFile = ({ editor, ...rest }: ToolButtonFileProps) => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('File size must be below 5MB.');
                return;
            }

            const fileName = file.name;
            const fileUrl = URL.createObjectURL(file);

            // Insert a link to the file in the editor
            editor.chain().focus().setLink({ href: fileUrl }).insertContent(fileName).run();

            // Clean up URL object when done
            setTimeout(() => URL.revokeObjectURL(fileUrl), 10000);
        }

        // Reset input value for consecutive uploads
        event.target.value = '';
    };

    return (
        <ToolButton
            title="Add File"
            onClick={() => document.getElementById('fileInput')?.click()}
            {...rest}
        >
            <TbFile />
            <input
                id="fileInput"
                type="file"
                accept="*"
                className="hidden"
                onChange={handleFileChange}
            />
        </ToolButton>
    );
};

export default ToolButtonFile;
