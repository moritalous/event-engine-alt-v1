import { Flex, Heading, Table, TableBody, TableCell, TableHead, TableRow, Text } from '@aws-amplify/ui-react';
import { GetAppMonitorDataCommand, RUMClient } from "@aws-sdk/client-rum";
import { Auth } from 'aws-amplify';
import { useEffect, useState } from 'react';


function timestamp(date: Date): number {
  const time = date.getTime()
  return Math.floor(time)
}

type item = {
  event_timestamp: number,
  email: string
}

function ItemTable({ items }: { items: item[] }) {

  const bodyItem = items.map((item) => {
    return (
      <TableRow>
        <TableCell>{new Date(item.event_timestamp).toLocaleString()}</TableCell>
        <TableCell>{item.email}</TableCell>
      </TableRow>
    )
  })

  return (
    <Table
      highlightOnHover={true}
    >
      <TableHead>
        <TableRow>
          <TableCell as='th'>イベント日時</TableCell>
          <TableCell as='th'>メールアドレス</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {bodyItem}
      </TableBody>
    </Table>
  )
}


function AdminUsageHistory() {

  const [items, setItems] = useState<item[]>([])

  useEffect(() => {

    Auth.currentCredentials()
      .then((cred) => {
        const today = new Date()

        const afterday = new Date()
        afterday.setDate(afterday.getDate() - 7)

        const client = new RUMClient({ region: 'ap-northeast-1', credentials: cred })

        const command = new GetAppMonitorDataCommand({
          Name: 'app-monitor-eventenginealt-dev',
          TimeRange: {
            After: timestamp(afterday),
            Before: timestamp(today)
          },
          Filters: [
            {
              Name: 'EventType',
              Values: ['PageLoad']
            }
          ],
          MaxResults: 100
        })

        client.send(command)
          .then((response) => {
            const result = response.Events?.map((e) => {
              const jsonEvent = JSON.parse(e)
              return {
                event_timestamp: jsonEvent.event_timestamp,
                email: jsonEvent.event_details.email
              } as item
            })

            if (result) {
              setItems([...items, ...result])
            }

          })
          .catch((e) => {
            console.error(e)
          })

      })
  }, [])

  return (
    <Flex direction={'column'} gap={'medium'}>
      <Heading level={3}>アクセス履歴</Heading>
      <Text as='p'>直近のアクセス履歴を表示します。</Text>
      <ItemTable items={items} />
    </Flex>
  )
}

export default AdminUsageHistory;
