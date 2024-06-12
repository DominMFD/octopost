import { ChangeEvent } from 'react';

import { PostMode } from '~services/api/social-media/social-media.types';

import { ErrorMapText } from '../ComposerEditor/ComposerEditor.types';
import { ErrorMediaInput } from '../MediaInputs/MediaInput.type';

export type TMainComposerBase = {
  accountId?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onErrorMedia?: (error: ErrorMediaInput) => void;
  onErrorText?: (error: ErrorMapText) => void;
  postMode?: PostMode;
  value?: string;
};
