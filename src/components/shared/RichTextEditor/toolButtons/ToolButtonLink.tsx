import { useState } from 'react';
import { TbLink } from 'react-icons/tb';
import ToolButton from './ToolButton';
import type { ToolButtonProps } from './ToolButton';
import type { BaseToolButtonProps } from './types';
import { Button, Input } from '@/components/ui';

type ToolButtonLinkProps = BaseToolButtonProps & ToolButtonProps;

const ToolButtonLink = ({ editor, ...rest }: ToolButtonLinkProps) => {
    const [showInput, setShowInput] = useState(false);
    const [url, setUrl] = useState('');
    const [asButton, setAsButton] = useState(false);

    const handleInsertLink = () => {
        if (url) {
            editor
                .chain()
                .focus()
                .extendMarkRange('link')
                .setLink({ href: url, class: asButton ? 'button-link' : '' })
                .run();
            setUrl('');
            setAsButton(false);
            setShowInput(false);
        }
    };

    const handleRemoveLink = () => {
        editor.chain().focus().unsetLink().run();
        setShowInput(false);
    };

    return (
        <div className="relative">
            <ToolButton
                title="Insert Link"
                disabled={!editor.can().chain().focus().setLink({ href: '' }).run()}
                active={editor.isActive('link')}
                onClick={() => setShowInput((prev) => !prev)}
                {...rest}
            >
                <TbLink />
            </ToolButton>
            {showInput && (
                <div className="absolute min-w-52 top-full left-0 mt-1 bg-neutral shadow-md border rounded-md p-4 z-10">
                    <div className="flex items-center gap-2">
                        <Input
                            type="url"
                            placeholder="Enter URL"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            size='sm'
                        />
                        <Button
                            onClick={handleInsertLink}
                            type='button'
                            size='sm'
                            variant='solid'
                        >
                            Add
                        </Button>
                    </div>
                    <label className="flex items-center mt-2 text-sm">
                        <input
                            type="checkbox"
                            checked={asButton}
                            onChange={(e) => setAsButton(e.target.checked)}
                            className="mr-2 w-4 h-4"
                        />
                        Style as Button
                    </label>
                    <Button
                        size='xs'
                        onClick={handleRemoveLink}
                        color='danger'
                        className='w-full mt-2 bg-error border-error hover:bg-error   '
                        variant='solid' 
                    >
                        Remove Link
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ToolButtonLink;
