import { Card, SimpleGrid, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import useCreateChat from "@/hooks/useCreateChat";

const EXAMPLES = [
  "Is the earth flat?",
  "Which is the best color?",
  "What are Spider webs made of?",
];

export default function Examples() {
  return (
    <SimpleGrid cols={{ base: 1, xs: 3 }} mt="xl">
      {EXAMPLES && EXAMPLES.map((e) => <Example key={e} text={e} />)}
    </SimpleGrid>
  );
}

function Example({ text }: { text: string }) {
  const navigate = useNavigate();

  const { mutate: createChat } = useCreateChat();

  return (
    <Card
      withBorder
      radius="md"
      style={{ cursor: "pointer" }}
      onClick={() =>
        createChat(
          { message: text },
          {
            onSuccess: async (values) => {
              console.log(values);
              await navigate(`/${values.id}`);
            },
          }
        )
      }
    >
      <Text fz="sm" fw="bold" c="dimmed">
        {text}
      </Text>
    </Card>
  );
}
