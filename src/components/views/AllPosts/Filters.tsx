"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import CharacterSelector from "@/components/ui/character-selector";
import useFilterParams from "@/hooks/useFilterParams";
import { useSearchParams } from "next/navigation";
import { FilterValues } from "@/lib/types";

export default function Filters() {
  const { handleFilter, clearFilters } = useFilterParams();
  const searchParams = useSearchParams();
  const [filterOptions, setFilterOptions] = useState<FilterValues>({
    character: undefined,
    opponent: undefined,
    timestamped: false,
    notes: undefined,
  });

  useEffect(() => {
    setFilterOptions({
      character: searchParams.get("character") || undefined,
      opponent: searchParams.get("opponent") || undefined,
      timestamped: searchParams.get("timestamped") === "true" ? true : false,
      notes: searchParams.get("notes") || undefined,
    });
  }, [searchParams]);

  useEffect(() => {
    handleFilter(filterOptions);
  }, [filterOptions, handleFilter]);

  return (
    <>
      <div className='flex flex-col gap-3'>
        <div>
          <Label htmlFor='char-select'>Character: </Label>
          <CharacterSelector
            onValueChange={(v: string) =>
              setFilterOptions((prev) => ({ ...prev, character: v }))
            }
            value={
              filterOptions.character ? filterOptions.character : undefined
            }
          />
        </div>
        <div>
          <Label htmlFor='opp-select'>Opponent: </Label>
          <CharacterSelector
            onValueChange={(v: string) =>
              setFilterOptions((prev) => ({ ...prev, opponent: v }))
            }
            value={filterOptions.opponent ? filterOptions.opponent : undefined}
          />
        </div>
        <div>
          <Label htmlFor='notes'>Notes: </Label>
          <Select
            onValueChange={(v: string) =>
              setFilterOptions((prev) => ({ ...prev, notes: v }))
            }
            value={filterOptions.notes ? filterOptions.notes : undefined}
          >
            <SelectTrigger>
              <SelectValue placeholder='Choose a note type' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='Theory'>Theory</SelectItem>
                <SelectItem value='Mentality'>Mentality</SelectItem>
                <SelectItem value='Edgeguarding'>Edgeguarding</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className='flex items-center gap-4'>
          <Label>Timestamped?</Label>
          <Switch
            onCheckedChange={(v) =>
              setFilterOptions((prev) => ({ ...prev, timestamped: v }))
            }
            checked={filterOptions.timestamped}
          />
        </div>

        <Button onClick={clearFilters}>Clear Filters</Button>
      </div>
    </>
  );
}
