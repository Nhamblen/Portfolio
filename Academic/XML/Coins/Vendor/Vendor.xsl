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
                <h1>Vendor</h1>
                <table>
                    <tr>
                        <h2>Vendor1</h2>
                        <th>Vendor_ID</th>
                        <th>Name</th>
                        <th>Contact_Name</th>
                        <th>WebSite</th>
                        <th>Phone_Num</th>
                    </tr>
                    <xsl:for-each select="Vendor/Vendor1">
                        <tr>
                            <td><xsl:value-of select="Vendor_ID"/></td>
                            <td><xsl:value-of select="Name"/></td>
                            <td><xsl:value-of select="Contact_Name"/></td>
                            <td><xsl:value-of select="WebSite"/></td>
                            <td><xsl:value-of select="Phone_Num"/></td>
                        </tr>
                    </xsl:for-each>
                    </table>
                    <table>
                    <tr>
                        <h2>Vendor2</h2>
                        <th>Vendor_ID</th>
                        <th>Name</th>
                        <th>Contact_Name</th>
                        <th>WebSite</th>
                        <th>Phone_Num</th>
                    </tr>
                    <xsl:for-each select="Vendor/Vendor2">
                        <tr>
                            <td><xsl:value-of select="Vendor_ID"/></td>
                            <td><xsl:value-of select="Name"/></td>
                            <td><xsl:value-of select="Contact_Name"/></td>
                            <td><xsl:value-of select="WebSite"/></td>
                            <td><xsl:value-of select="Phone_Num"/></td>
                        </tr>
                    </xsl:for-each>
                    </table>
                    <table>
                    <tr>
                        <h2>Vendor3</h2>
                        <th>Vendor_ID</th>
                        <th>Name</th>
                        <th>Contact_Name</th>
                        <th>WebSite</th>
                        <th>Phone_Num</th>
                    </tr>
                    <xsl:for-each select="Vendor/Vendor3">
                        <tr>
                            <td><xsl:value-of select="Vendor_ID"/></td>
                            <td><xsl:value-of select="Name"/></td>
                            <td><xsl:value-of select="Contact_Name"/></td>
                            <td><xsl:value-of select="WebSite"/></td>
                            <td><xsl:value-of select="Phone_Num"/></td>
                        </tr>
                    </xsl:for-each>
                    </table>
                    <table>
                    <tr>
                        <h2>Vendor4</h2>
                        <th>Vendor_ID</th>
                        <th>Name</th>
                        <th>Contact_Name</th>
                        <th>WebSite</th>
                        <th>Phone_Num</th>
                    </tr>
                    <xsl:for-each select="Vendor/Vendor4">
                        <tr>
                            <td><xsl:value-of select="Vendor_ID"/></td>
                            <td><xsl:value-of select="Name"/></td>
                            <td><xsl:value-of select="Contact_Name"/></td>
                            <td><xsl:value-of select="WebSite"/></td>
                            <td><xsl:value-of select="Phone_Num"/></td>
                        </tr>
                    </xsl:for-each>
                    </table>
                    <table>
                    <tr>
                        <h2>Vendor5</h2>
                        <th>Vendor_ID</th>
                        <th>Name</th>
                        <th>Contact_Name</th>
                        <th>WebSite</th>
                        <th>Phone_Num</th>
                    </tr>
                    <xsl:for-each select="Vendor/Vendor5">
                        <tr>
                            <td><xsl:value-of select="Vendor_ID"/></td>
                            <td><xsl:value-of select="Name"/></td>
                            <td><xsl:value-of select="Contact_Name"/></td>
                            <td><xsl:value-of select="WebSite"/></td>
                            <td><xsl:value-of select="Phone_Num"/></td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>