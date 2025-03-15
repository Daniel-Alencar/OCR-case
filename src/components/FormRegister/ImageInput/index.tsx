'use client';
import React from 'react';
import Image from 'next/image';
import addPhoto from '../../../public/assets/Form/AddPhoto.png';

import { useState } from 'react';

function ImageInput() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col justify-center items-center">
        <Image className="cursor-pointer" src={addPhoto} alt="addPhoto" />
      </div>
      <div className="flex flex-col justify-center items-center gap-7">
        <div className="flex flex-col justify-center items-center">
          <p className="text-text-1">Allowed format</p>
          <p>JPG, JPEG and PNG</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-text-1">Max file size</p>
          <p>2MB</p>
        </div>
      </div>
    </div>
  );
}

export default ImageInput;
