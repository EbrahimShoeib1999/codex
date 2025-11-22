"use client";

import React from 'react';

interface InlineEditorProps {
  value: string;
  onSave: (value: string) => void;
  fieldName: string;
  type?: 'input' | 'textarea';
}

const InlineEditor: React.FC<InlineEditorProps> = ({ value }) => {
  return <>{value}</>;
};

export { InlineEditor };
