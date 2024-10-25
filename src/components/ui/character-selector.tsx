import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";

import Image from "next/image";
import { charOptions } from "@/constants";
import { getImageFromName } from "@/utils/helpers";
import { SelectProps } from "@radix-ui/react-select";

export default function CharacterSelector(
  props: React.PropsWithChildren<SelectProps>
) {
  return (
    <Select {...props}>
      <SelectTrigger>
        <SelectValue placeholder='Choose a character' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {charOptions.map((char) => (
            <SelectItem key={char.value} value={char.value}>
              <Image
                className='mr-2 inline'
                src={getImageFromName(char.value)}
                alt={char.label}
              />
              {char.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
