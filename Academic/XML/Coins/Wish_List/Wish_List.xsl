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
                <h1>Wish_List</h1>
                <table>
                    <tr>
                        <h2>Coin1</h2>
                        <th>Coin_ID</th>
                        <th>Issue_Date</th>
                        <th>Category</th>
                        <th>Type</th>
                        <th>Value</th>
                    </tr>
                    <xsl:for-each select="Wish_List/Coin1">
                        <tr>
                            <td><xsl:value-of select="Coin_ID"/></td>
                            <td><xsl:value-of select="Issue_Date"/></td>
                            <td><xsl:value-of select="Category"/></td>
                            <td><xsl:value-of select="Type"/></td>
                            <td><xsl:value-of select="Value"/></td>
                        </tr>
                    </xsl:for-each>
                    </table>
                    <table>
                    <tr>
                        <h2>Coin2</h2>
                        <th>Coin_ID</th>
                        <th>Issue_Date</th>
                        <th>Category</th>
                        <th>Type</th>
                        <th>Value</th>
                    </tr>
                    <xsl:for-each select="Wish_List/Coin2">
                        <tr>
                            <td><xsl:value-of select="Coin_ID"/></td>
                            <td><xsl:value-of select="Issue_Date"/></td>
                            <td><xsl:value-of select="Category"/></td>
                            <td><xsl:value-of select="Type"/></td>
                            <td><xsl:value-of select="Value"/></td>
                        </tr>
                    </xsl:for-each>
                    </table>
                    <table>
                    <tr>
                        <h2>Coin3</h2>
                        <th>Coin_ID</th>
                        <th>Issue_Date</th>
                        <th>Category</th>
                        <th>Type</th>
                        <th>Value</th>
                    </tr>
                    <xsl:for-each select="Wish_List/Coin3">
                        <tr>
                            <td><xsl:value-of select="Coin_ID"/></td>
                            <td><xsl:value-of select="Issue_Date"/></td>
                            <td><xsl:value-of select="Category"/></td>
                            <td><xsl:value-of select="Type"/></td>
                            <td><xsl:value-of select="Value"/></td>
                        </tr>
                    </xsl:for-each>
                    </table>
                    <table>
                    <tr>
                        <h2>Coin4</h2>
                        <th>Coin_ID</th>
                        <th>Issue_Date</th>
                        <th>Category</th>
                        <th>Type</th>
                        <th>Value</th>
                    </tr>
                    <xsl:for-each select="Wish_List/Coin4">
                        <tr>
                            <td><xsl:value-of select="Coin_ID"/></td>
                            <td><xsl:value-of select="Issue_Date"/></td>
                            <td><xsl:value-of select="Category"/></td>
                            <td><xsl:value-of select="Type"/></td>
                            <td><xsl:value-of select="Value"/></td>
                        </tr>
                    </xsl:for-each>
                    </table>
                    <table>
                    <tr>
                        <h2>Coin5</h2>
                        <th>Coin_ID</th>
                        <th>Issue_Date</th>
                        <th>Category</th>
                        <th>Type</th>
                        <th>Value</th>
                    </tr>
                    <xsl:for-each select="Wish_List/Coin5">
                        <tr>
                            <td><xsl:value-of select="Coin_ID"/></td>
                            <td><xsl:value-of select="Issue_Date"/></td>
                            <td><xsl:value-of select="Category"/></td>
                            <td><xsl:value-of select="Type"/></td>
                            <td><xsl:value-of select="Value"/></td>
                        </tr>
                    </xsl:for-each>
                </table>

                
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>