import React, { useState } from 'react';
import * as bip39 from "bip39";
import { ethers } from "ethers";
import { HDNode } from "@ethersproject/hdnode";
import { Buffer } from 'buffer';
import { Button, Grid, Typography, Paper, Card, CardContent, IconButton, Divider } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

window.Buffer = Buffer;

const EthWallets = () => {
    const [mnemonic, setMnemonic] = useState("");
    const [wallets, setWallets] = useState([]);
    const [index, setIndex] = useState(0);
    const [display, setDisplay] = useState([]);
    const [showPrivateKey, setShowPrivateKey] = useState(null);

    const generateMnemonic = () => {
        const newMnemonic = bip39.generateMnemonic();
        setMnemonic(newMnemonic);
        const arr = new Set(newMnemonic.split(" "));
        setDisplay([...arr]);
    };

    const createEthereumWallet = () => {
        if (mnemonic) {
            const seed = bip39.mnemonicToSeedSync(mnemonic);
            const hdNode = HDNode.fromSeed(seed);
            const path = `m/44'/60'/0'/0/${index}`;
            const wallet = hdNode.derivePath(path);

            setWallets((prevWallets) => [
                ...prevWallets,
                {
                    publicKey: wallet.address,
                    privateKey: wallet.privateKey,
                },
            ]);
            setIndex(index + 1);
        }
    };

    const toggleShowPrivateKey = (index) => {
        setShowPrivateKey(showPrivateKey === index ? null : index);
    };

    return (
        <div className="p-4 max-w-lg mx-auto">
            <Button
                onClick={generateMnemonic}
                variant="contained"
                color="primary"
                fullWidth
                style={{ height: '50px', width: '200px', margin: '10px auto', display: 'block' }}
            >
                {mnemonic ? "Regenerate Mnemonic" : "Generate Mnemonic"}
            </Button>

            {mnemonic && (
                <div style={{ padding: 20 }}>
                    <Typography variant="h5" gutterBottom align="center">
                        Seed Phrases
                    </Typography>
                    <Grid container spacing={2} justifyContent="center">
                        {display.map((phrase, index) => (
                            <Grid item xs={6} sm={4} md={3} key={index}>
                                <Paper
                                    elevation={3}
                                    style={{
                                        padding: 10,
                                        textAlign: 'center',
                                        backgroundColor: '#f5f5f5',
                                        borderRadius: 8,
                                    }}
                                >
                                    <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                                        {phrase}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            )}

            <Button
                onClick={createEthereumWallet}
                variant="contained"
                color="success"
                fullWidth
                style={{ height: '50px', width: '200px', margin: '10px auto', display: 'block', color:"white" }}
                disabled={!mnemonic}
            >
                Generate Ethereum Wallet
            </Button>

            <Grid container spacing={2} style={{ marginTop: '16px' }}>
                {wallets.map((wallet, idx) => (
                    <Grid item xs={12} sm={6} key={idx}>
                        <Card elevation={3} style={{ height: 'auto' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Wallet {idx + 1}
                                </Typography>
                                <Divider />
                                <Typography variant="body1" style={{ marginTop: '8px' }}>
                                    <strong>Public Key:</strong> {wallet.publicKey}
                                </Typography>
                                <Typography variant="body1" style={{ marginTop: '8px' }}>
                                    <strong>Private Key:</strong>
                                    {" "}{showPrivateKey === idx ? wallet.privateKey : "**************"}
                                    <IconButton
                                        onClick={() => toggleShowPrivateKey(idx)}
                                        style={{ marginLeft: '8px' }}
                                    >
                                        {showPrivateKey === idx ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default EthWallets;
