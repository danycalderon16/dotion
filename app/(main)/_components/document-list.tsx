"use client";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { Item } from "./item";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";

interface Props {
  parentDocumentId?: Id<"documents">;
  level?: number;
  data?: Doc<"documents">[];
}

export const DocumentList = ({ parentDocumentId, level = 0, data }: Props) => {
  const params = useParams();
  const router = useRouter();

  const [isExpanded, setIsExpanded] = useState<Record<string, boolean>>({});

  const onExpand = (documentId: string) => {
    setIsExpanded((prev) => ({ ...prev, [documentId]: !prev[documentId] }));
  };

  const documents = useQuery(api.docuements.getSidebar, {
    parentDocument: parentDocumentId,
  });

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  if (documents === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }
  return (
    <>
      <p
        style={{
          paddingLeft: level ? `${(level * 12 )+ 25}px` : undefined,
        }}
        className={cn("hidden text-sm font-medium text-muted-foreground",
                isExpanded && "last:block",
                level === 0 && "hidden"
        )}
      >No pages inside</p>
      {documents.map((docuement)=>(
        <div key={docuement._id} className="transition-all">
          <Item 
            id={docuement._id}
            onClick={()=>onRedirect(docuement._id)}
            label={docuement.title}
            icon={FileIcon}
            documentIcon={docuement.icon}
            active={params.documentId === docuement._id}
            level={level}
            onExpand={()=>onExpand(docuement._id)}
            expanded={isExpanded[docuement._id]}
            />
            {isExpanded[docuement._id] && (
              <DocumentList
                parentDocumentId={docuement._id}
                level={level + 1}
              /> 
            )}
        </div>
      ))}
    </>
  );
};
