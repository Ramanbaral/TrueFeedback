"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Pagination({ curPage, totalPage }: { curPage: number; totalPage: number }) {
  const router = useRouter();
  return (
    <ul className="mt-10 mb-5 flex justify-center gap-3 text-gray-900">
      <Button variant="ghost" disabled={curPage == 1}>
        <li>
          <Link
            href={{
              pathname: "/dashboard",
              query: {
                page: curPage - 1,
              },
            }}
            className="grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50 rtl:rotate-180"
            aria-label="Previous page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </li>
      </Button>
      <li className="text-sm/8 font-medium tracking-widest">
        {curPage}/{totalPage}
      </li>

      <Button
        variant="ghost"
        disabled={curPage == totalPage}
        onClick={() => {
          router.refresh();
        }}
      >
        <li>
          <Link
            href={{
              pathname: "/dashboard",
              query: {
                page: +curPage + 1,
              },
            }}
            className="grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50 rtl:rotate-180"
            aria-label="Next page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </li>
      </Button>
    </ul>
  );
}
