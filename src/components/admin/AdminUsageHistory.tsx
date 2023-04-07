import { Flex, Heading, Table, TableBody, TableCell, TableHead, TableRow, Text } from '@aws-amplify/ui-react';
import { API } from 'aws-amplify';
import { useEffect, useState } from 'react';

type item = {
  eventTime: string,
  eventSource: string,
  eventName: string,
  userName: string,
  email: string
}

function ItemTable({ items }: { items: item[] }) {

  const bodyItem = items.map((item) => {
    return (
      <TableRow>
        <TableCell>{new Date(item.eventTime).toLocaleString()}</TableCell>
        <TableCell>{item.userName}</TableCell>
        <TableCell>{item.email}</TableCell>
        <TableCell>{item.eventSource}</TableCell>
        <TableCell>{item.eventName}</TableCell>
      </TableRow>
    )
  })

  return (
    <Table
      highlightOnHover={true}
    >
      <TableHead>
        <TableRow>
          <TableCell as='th'>EventTime</TableCell>
          <TableCell as='th'>UserName</TableCell>
          <TableCell as='th'>Email</TableCell>
          <TableCell as='th'>EventSource</TableCell>
          <TableCell as='th'>EventName</TableCell>
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

    API.get('apicc2c68d4', '/eventlog', {})
    .then(response => setItems(response))

    // Auth.currentCredentials()
    //   .then((cred) => {
    //     const today = new Date()

    //     const afterday = new Date()
    //     afterday.setDate(afterday.getDate() - 7)

    //     const client = new RUMClient({ region: 'ap-northeast-1', credentials: cred })

    //     const command = new GetAppMonitorDataCommand({
    //       Name: 'app-monitor-eventenginealt-dev',
    //       TimeRange: {
    //         After: timestamp(afterday),
    //         Before: timestamp(today)
    //       },
    //       Filters: [
    //         {
    //           Name: 'EventType',
    //           Values: ['PageLoad']
    //         }
    //       ],
    //       MaxResults: 100
    //     })

    //     client.send(command)
    //       .then((response) => {
    //         const result = response.Events?.map((e) => {
    //           const jsonEvent = JSON.parse(e)
    //           return {
    //             event_timestamp: jsonEvent.event_timestamp,
    //             email: jsonEvent.event_details.email
    //           } as item
    //         })

    //         if (result) {
    //           setItems([...items, ...result])
    //         }

    //       })
    //       .catch((e) => {
    //         console.error(e)
    //       })

    //   })
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
