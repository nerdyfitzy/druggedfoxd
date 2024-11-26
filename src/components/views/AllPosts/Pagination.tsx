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
import { DEFAULT_AMOUNT } from "@/constants";
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
              className='sm:max-md:text-xs'
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
                  className='sm:max-md:text-xs'
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
                  className='sm:max-md:text-xs'
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
                <PaginationEllipsis className='sm:max-md:text-xs' />
              </PaginationItem>
              <PaginationItem key={totalPages}>
                <PaginationLink
                  className='sm:max-md:text-xs'
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
              className='sm:max-md:text-xs'
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
            <SelectValue
              defaultValue={DEFAULT_AMOUNT}
              placeholder={DEFAULT_AMOUNT}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={String(25)}>25</SelectItem>
              <SelectItem value={String(50)}>50</SelectItem>
              <SelectItem value={String(DEFAULT_AMOUNT)}>
                {DEFAULT_AMOUNT}
              </SelectItem>
              <SelectItem value={String(100)}>100</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
