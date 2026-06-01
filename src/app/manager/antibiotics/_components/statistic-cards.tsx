import { Card, CardContent } from "@/src/components/ui/card"

interface Props {
  metadata: {
    totalItemCount: number
    currentPage: number
    pageCount: number
  }
}

export function StatisticsCards({
                                  metadata,
                                }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">
            Total Antibiotics
          </p>

          <h2 className="text-2xl font-bold">
            {metadata.totalItemCount}
          </h2>
        </CardContent>
      </Card>

      {/*<Card>*/}
      {/*  <CardContent className="p-6">*/}
      {/*    <p className="text-sm text-muted-foreground">*/}
      {/*      Current Page*/}
      {/*    </p>*/}

      {/*    <h2 className="text-2xl font-bold">*/}
      {/*      {metadata.currentPage}*/}
      {/*    </h2>*/}
      {/*  </CardContent>*/}
      {/*</Card>*/}

      {/*<Card>*/}
      {/*  <CardContent className="p-6">*/}
      {/*    <p className="text-sm text-muted-foreground">*/}
      {/*      Total Pages*/}
      {/*    </p>*/}

      {/*    <h2 className="text-2xl font-bold">*/}
      {/*      {metadata.pageCount}*/}
      {/*    </h2>*/}
      {/*  </CardContent>*/}
      {/*</Card>*/}
    </div>
  )
}