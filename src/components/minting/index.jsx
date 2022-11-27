import {useState, Fragment} from 'react'

import { Controller } from 'react-hook-form'
import { Button, Form } from 'react-bootstrap'

import { useMinting } from 'components/minting/hooks'
import {store} from 'store'
import {encrypt} from '../../helper/crypt'
import { create } from 'ipfs-http-client'

export const Minting = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [source, setSourse] = useState('')

  const [baseImage, setBaseImage] = useState("");
  const [ipfsLink, setIpfsLink] = useState("");

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage(base64);
    let ipfs = await ipfsClient();

    let result = await ipfs.add(encrypt(base64));
    setIpfsLink("https://ipfs.io/ipfs/" + result.path)
  };

  async function ipfsClient() { 
      const ipfs = await create({
          url: "http://ipfs-hackaton.itgold.io:5001/"
      });
      
      return ipfs;
  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const submit = () => {
    store.mintNft({
      name, 
      description,
      source: ipfsLink,
    })
  }

  return (
    <Fragment>
      <h2 className='text-center'>Minting new NFT</h2>
      <Form.Group className='mb-3' controlId='nameField'>
        <Form.Label>Name</Form.Label>
        <Form.Control
          placeholder='Enter NFT name'
          onChange={(e) => setName(e.target.value)}
          value={name}
          type='text'
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='descriptionField'>
        <Form.Label>Description</Form.Label>
        <Form.Control
          placeholder='Enter NFT description'
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          type='text'
        />
      </Form.Group>
      <input
          type="file"
          onChange={uploadImage}
        />
      <div className='d-grid gap-2'>
        <Button onClick={submit}>Submit</Button>
      </div>
    </Fragment>
  )
}
