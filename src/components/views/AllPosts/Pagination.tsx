"use client";

import React from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import usePaginationParams from "@/hooks/usePaginationParams";

type PostsPaginationProps = {
  page: number;
  totalPages: number;
};

export default function PostsPagination({
  page,
  totalPages,
}: PostsPaginationProps) {
  const { handleParams } = usePaginationParams();
  return (
    <div className='flex w-full flex-row items-center justify-center pt-2'>
      <Pagination className='justify-self-center'>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className=''
              href='#'
              onClick={() => {
                if (page > 1) handleParams(page - 1, -1);
              }}
            />
          </PaginationItem>
          {page > 3 ? (
            <>
              <PaginationItem key={1}>
                <PaginationLink
                  onClick={() => handleParams(1, -1)}
                  isActive={page === 1}
                  href='#'
                >
                  {1}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            </>
          ) : (
            <></>
          )}

          {Array.from(
            {
              length:
                totalPages < 4
                  ? totalPages
                  : totalPages - page >= 2
                  ? 3
                  : totalPages - page + 1,
            },
            (_, i) => (
              <PaginationItem key={i + page}>
                <PaginationLink
                  onClick={() => handleParams(i + page, -1)}
                  isActive={page === i + page}
                  href='#'
                >
                  {i + page}
                </PaginationLink>
              </PaginationItem>
            )
          )}
          <></>
          {totalPages - page > 3 ? (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem key={totalPages}>
                <PaginationLink
                  onClick={() => handleParams(totalPages, -1)}
                  isActive={page === totalPages}
                  href='#'
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          ) : (
            <></>
          )}
          <PaginationItem>
            <PaginationNext
              href='#'
              onClick={() => {
                if (page < totalPages) handleParams(page + 1, -1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <div className='sm:max-md:hidden sm:max-md:absolute flex items-center gap-2 justify-self-end'>
        <Label className='min-w-fit' htmlFor='Amount-Select'>
          Number of Cards:{"   "}
        </Label>
        <Select onValueChange={(v: string) => handleParams(-1, Number(v))}>
          <SelectTrigger className='w-16'>
            <SelectValue defaultValue={20} placeholder={20} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={String(10)}>10</SelectItem>
              <SelectItem value={String(15)}>15</SelectItem>
              <SelectItem value={String(20)}>20</SelectItem>
              <SelectItem value={String(30)}>30</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
