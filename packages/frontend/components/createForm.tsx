import { useState } from 'react'
import { Input, Flex, Textarea, Center, Box, Button } from '@chakra-ui/react'
import { uploadImageToIPFS } from '../services/create-post';

type Props = {
    submit: any,
}

const CreateForm = (props: Props) => {
    const [fileUrl, setFileUrl] = useState<any>(null);
    const [fileUpload, setFileUpload] = useState();
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<string>('');

    const handleSubmit = () => {
        props.submit(description, fileUrl, price);
    }

    async function handleImageUpload(e: any) {
        if (!e || !e.target || !e.target.files || !e.target.files[0]) {
            setFileUrl(null);
            return;
        }
        const file = e.target.files[0];
        try {
            // const url = await uploadImageToIPFS(file);
            // setFileUrl(url);
            // setFileUpload(file);
            setFileUrl("https://ipfs.infura.io/ipfs/QmQVDpasygPGJ6dQZzCzzFvDZoPgPbprSfp6pyhkZLr8DL");
        } catch (error) {
            console.log(`Error uploading file: ${error}`);
        }
    }
    const renderImage = () => {
        if (fileUrl) {
            return <img className="rounded mt-4" width="350" src={fileUrl} />;
        }
        return '';
    };
    return (
        <>
            <Center>
                <Box maxW="lg" p={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
                    <Flex direction="column">
                        <Box mb={4} h="300px" borderWidth="1px" borderRadius="lg" overflow="hidden">
                            {renderImage()}
                        </Box>
                        <Textarea
                            mb={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="NFT description"
                            size="sm"
                        />
                        <Box mb={4}>
                            <Input w="100px" placeholder="ETH price" onChange={(e) => setPrice(e.target.value)} />
                        </Box>
                        <Box mb={4}>
                            <input type="file" name="image" className="CreateForm__img" onChange={handleImageUpload}/>
                        </Box>
                        <Button mb={4} colorScheme={'purple'} onClick={handleSubmit}>submit</Button>
                    </Flex>
                </Box>
            </Center>
        </>
    )
}

export default CreateForm;