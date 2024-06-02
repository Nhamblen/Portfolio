<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    <xsl:output method="html" />
    <xsl:template match="/">


        <html>
            <head>
                <title>XML Coins</title>
            </head>
            
            <body>
                <h1>Rarity</h1>
                <table>
                    <tr>
                        <h2>Coin1</h2>
                        <th>Rarity_ID</th>
                        <th>Type</th>
                        <th>Rare</th>
                        <th>Purchase_Date</th>
                        <th>Value</th>
                    </tr>
                    <xsl:for-each select="Rarity/Coin1">
                        <tr>
                            <td><xsl:value-of select="Rarity_ID"/></td>
                            <td><xsl:value-of select="Type"/></td>
                            <td><xsl:value-of select="Rare"/></td>
                            <td><xsl:value-of select="Purchase_Date"/></td>
                            <td><xsl:value-of select="Value"/></td>
                        </tr>
                    </xsl:for-each>
                    </table>
                    <table>
                    <tr>
                        <h2>Coin2</h2>
                        <th>Rarity_ID</th>
                        <th>Type</th>
                        <th>Rare</th>
                        <th>Purchase_Date</th>
                        <th>Value</th>
                    </tr>
                    <xsl:for-each select="Rarity/Coin2">
                        <tr>
                            <td><xsl:value-of select="Rarity_ID"/></td>
                            <td><xsl:value-of select="Type"/></td>
                            <td><xsl:value-of select="Rare"/></td>
                            <td><xsl:value-of select="Purchase_Date"/></td>
                            <td><xsl:value-of select="Value"/></td>
                        </tr>
                    </xsl:for-each>
                    </table>
                    <table>
                    <tr>
                        <h2>Coin3</h2>
                        <th>Rarity_ID</th>
                        <th>Type</th>
                        <th>Rare</th>
                        <th>Purchase_Date</th>
                        <th>Value</th>
                    </tr>
                    <xsl:for-each select="Rarity/Coin3">
                        <tr>
                            <td><xsl:value-of select="Rarity_ID"/></td>
                            <td><xsl:value-of select="Type"/></td>
                            <td><xsl:value-of select="Rare"/></td>
                            <td><xsl:value-of select="Purchase_Date"/></td>
                            <td><xsl:value-of select="Value"/></td>
                        </tr>
                    </xsl:for-each>
                    </table>
                    <table>
                    <tr>
                        <h2>Coin4</h2>
                        <th>Rarity_ID</th>
                        <th>Type</th>
                        <th>Rare</th>
                        <th>Purchase_Date</th>
                        <th>Value</th>
                    </tr>
                    <xsl:for-each select="Rarity/Coin4">
                        <tr>
                            <td><xsl:value-of select="Rarity_ID"/></td>
                            <td><xsl:value-of select="Type"/></td>
                            <td><xsl:value-of select="Rare"/></td>
                            <td><xsl:value-of select="Purchase_Date"/></td>
                            <td><xsl:value-of select="Value"/></td>
                        </tr>
                    </xsl:for-each>
                    </table>
                    <table>
                    <tr>
                        <h2>Coin5</h2>
                        <th>Rarity_ID</th>
                        <th>Type</th>
                        <th>Rare</th>
                        <th>Purchase_Date</th>
                        <th>Value</th>
                    </tr>
                    <xsl:for-each select="Rarity/Coin5">
                        <tr>
                            <td><xsl:value-of select="Rarity_ID"/></td>
                            <td><xsl:value-of select="Type"/></td>
                            <td><xsl:value-of select="Rare"/></td>
                            <td><xsl:value-of select="Purchase_Date"/></td>
                            <td><xsl:value-of select="Value"/></td>
                        </tr>
                    </xsl:for-each>
                </table>


            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>