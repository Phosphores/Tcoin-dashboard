'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowRight, BarChart3, CreditCard, History, QrCode, Send, Settings, Users, X } from "lucide-react"

export default function Component() {
  const [balance, setBalance] = useState(123.45)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [transactions, setTransactions] = useState([
    { name: "Coffee Shop", amount: -3, date: "Today, 9:00 AM" },
    { name: "John Doe", amount: 5, date: "Yesterday, 2:30 PM" },
    { name: "Grocery Store", amount: -10, date: "Mar 15, 11:20 AM" },
  ])
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false)
  const [isSendDialogOpen, setIsSendDialogOpen] = useState(false)
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false)
  const [isContactsDialogOpen, setIsContactsDialogOpen] = useState(false)
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false)
  const [isTopUpDialogOpen, setIsTopUpDialogOpen] = useState(false)
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false)

  const handleSend = () => {
    setIsSendDialogOpen(true)
  }

  const handleTopUp = () => {
    setIsTopUpDialogOpen(true)
  }

  const handleRequest = () => {
    setIsRequestDialogOpen(true)
  }

  const handleScanQR = () => {
    setIsQRScannerOpen(true)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-4 shadow-md">
        <div className="mb-8">
          <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TDAO%20Logo-Byah7pl18yzlPqnVFw15JarptPXnig.png" alt="TCOIN Logo" className="h-12 w-auto" />
        </div>
        <nav className="space-y-2">
          {['dashboard', 'send', 'scan', 'history', 'contacts', 'settings'].map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => {
                setActiveTab(tab)
                if (tab === 'scan') {
                  handleScanQR()
                } else if (tab === 'send') {
                  handleSend()
                } else if (tab === 'history') {
                  setIsHistoryDialogOpen(true)
                } else if (tab === 'contacts') {
                  setIsContactsDialogOpen(true)
                } else if (tab === 'settings') {
                  setIsSettingsDialogOpen(true)
                }
              }}
            >
              {tab === 'dashboard' && <BarChart3 className="mr-2 h-4 w-4" />}
              {tab === 'send' && <Send className="mr-2 h-4 w-4" />}
              {tab === 'scan' && <QrCode className="mr-2 h-4 w-4" />}
              {tab === 'history' && <History className="mr-2 h-4 w-4" />}
              {tab === 'contacts' && <Users className="mr-2 h-4 w-4" />}
              {tab === 'settings' && <Settings className="mr-2 h-4 w-4" />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome back!</h1>
          <p className="text-gray-600">Here's an overview of your TCOIN account</p>
        </div>

        {/* Balance Card */}
        <Card className="mb-8 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="text-lg font-semibold">My Balance</div>
            <div className="mt-2 text-4xl font-bold">{balance.toFixed(2)} TCOIN</div>
            <div className="mt-1 text-sm opacity-80">≈ ${(balance * 3.3).toFixed(2)} CAD</div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Button className="h-auto flex-col items-start p-4" onClick={handleSend}>
            <Send className="mb-2 h-6 w-6" />
            <span>Send TCOIN</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col items-start p-4" onClick={handleScanQR}>
            <QrCode className="mb-2 h-6 w-6" />
            <span>Scan QR</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col items-start p-4" onClick={handleTopUp}>
            <CreditCard className="mb-2 h-6 w-6" />
            <span>Top Up Balance</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col items-start p-4" onClick={handleRequest}>
            <Users className="mb-2 h-6 w-6" />
            <span>Request TCOIN</span>
          </Button>
        </div>

        {/* Transactions and Analytics */}
        <Tabs defaultValue="transactions" className="space-y-4">
          <TabsList>
            <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{transaction.name}</div>
                        <div className="text-sm text-gray-500">{transaction.date}</div>
                      </div>
                      <div className={transaction.amount > 0 ? "text-green-600" : "text-red-600"}>
                        {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)} TCOIN
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <p className="text-sm text-gray-500">Overall donations to my charity</p>
              </CardHeader>
              <CardContent>
                <div className="aspect-[2/1] w-full bg-white p-4 rounded-lg shadow">
                  <svg viewBox="0 0 400 200" className="w-full h-full">
                    {/* Bar Chart */}
                    {Array.from({ length: 12 }, (_, i) => (
                      <rect
                        key={i}
                        x={i * 32 + 10}
                        y={200 - Math.random() * 100 - 50}
                        width="24"
                        height={Math.random() * 100 + 50}
                        fill="#E91E63"
                        opacity="0.8"
                      />
                    ))}
                    {/* Line Chart */}
                    <path
                      d="M10,150 Q100,100 200,120 T400,100"
                      fill="none"
                      stroke="#3F51B5"
                      strokeWidth="3"
                    />
                    <path
                      d="M10,180 Q120,150 220,170 T400,140"
                      fill="none"
                      stroke="#FF4081"
                      strokeWidth="3"
                    />
                  </svg>
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <div className="bg-pink-100 p-4 rounded-lg">
                    <h3 className="font-semibold text-pink-800">My activity contributed:</h3>
                    <p className="text-2xl font-bold text-pink-600">56 TCOIN</p>
                    <p className="text-sm text-pink-700">to my charity</p>
                  </div>
                  <div className="bg-purple-100 p-4 rounded-lg">
                    <h3 className="font-semibold text-purple-800">Total Contributed:</h3>
                    <p className="text-2xl font-bold text-purple-600">563 TCOIN</p>
                    <p className="text-sm text-purple-700">to my charity by 63 users</p>
                  </div>
                  <div className="bg-blue-100 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-800">Overall Contributed:</h3>
                    <p className="text-2xl font-bold text-blue-600">6,789 TCOIN</p>
                    <p className="text-sm text-blue-700">to all charities by 432 users</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* QR Scanner Modal */}
      <Dialog open={isQRScannerOpen} onOpenChange={setIsQRScannerOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Scan QR Code</DialogTitle>
            <DialogDescription>
              Position the QR code within the frame to scan.
            </DialogDescription>
          </DialogHeader>
          <div className="relative aspect-square w-full max-w-sm mx-auto bg-gray-100 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 border-2 border-red-500 rounded-lg"></div>
            </div>
            <video className="w-full h-full object-cover" />
          </div>
          <Button onClick={() => setIsQRScannerOpen(false)} variant="outline" className="mt-4">
            <X className="mr-2 h-4 w-4" /> Close Scanner
          </Button>
        </DialogContent>
      </Dialog>

      {/* Send TCOIN Modal */}
      <Dialog open={isSendDialogOpen} onOpenChange={setIsSendDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Send TCOIN</DialogTitle>
            <DialogDescription>
              Enter the amount and address to send TCOIN.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input id="amount" type="number" className="col-span-3" placeholder="Enter amount" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Input id="address" className="col-span-3" placeholder="Enter recipient's address" />
            </div>
          </div>
          <Button onClick={() => setIsSendDialogOpen(false)}>Send TCOIN</Button>
        </DialogContent>
      </Dialog>

      {/* History Modal */}
      <Dialog open={isHistoryDialogOpen} onOpenChange={setIsHistoryDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Transaction History</DialogTitle>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.name}</TableCell>
                  <TableCell>{transaction.amount.toFixed(2)} TCOIN</TableCell>
                  <TableCell>{transaction.amount > 0 ? 'Credit' : 'Debit'}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>

      {/* Contacts Modal */}
      <Dialog open={isContactsDialogOpen} onOpenChange={setIsContactsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Contacts</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {['Alice', 'Bob', 'Charlie', 'David', 'Eve'].map((contact, index) => (
              <div key={index} className="flex items-center justify-between">
                <span>{contact}</span>
                <Button variant="outline" size="sm">Send TCOIN</Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Request TCOIN Modal */}
      <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Request TCOIN</DialogTitle>
            <DialogDescription>
              Enter the amount and address to request TCOIN.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="request-amount" className="text-right">
                Amount
              </Label>
              <Input id="request-amount" type="number" className="col-span-3" placeholder="Enter amount" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="request-address" className="text-right">
                From
              </Label>
              <Input id="request-address" className="col-span-3" placeholder="Enter sender's address" />
            </div>
          </div>
          <Button onClick={() => setIsRequestDialogOpen(false)}>Request TCOIN</Button>
        </DialogContent>
      </Dialog>

      {/* Top Up Balance Modal */}
      <Dialog open={isTopUpDialogOpen} onOpenChange={setIsTopUpDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Top Up Balance</DialogTitle>
            <DialogDescription>
              Enter the amount to add to your TCOIN balance.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="topup-amount" className="text-right">
                Amount
              </Label>
              <Input id="topup-amount" type="number" className="col-span-3" placeholder="Enter amount" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="payment-method" className="text-right">
                Method
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit-card">Credit Card</SelectItem>
                  <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={() => setIsTopUpDialogOpen(false)}>Top Up</Button>
        </DialogContent>
      </Dialog>

      {/* Settings Modal */}
      <Dialog open={isSettingsDialogOpen} onOpenChange={setIsSettingsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <Switch id="dark-mode" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="user-type">I identify as:</Label>
              <Select>
                <SelectTrigger id="user-type">
                  <SelectValue placeholder="Select user type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="donor">Donor</SelectItem>
                  <SelectItem value="panhandler">Panhandler</SelectItem>
                  <SelectItem value="service-worker">Service Worker</SelectItem>
                  <SelectItem value="store-owner">Store Owner</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="charity-selection">Charity Selection:</Label>
              <Select>
                <SelectTrigger id="charity-selection">
                  <SelectValue placeholder="Select charity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="charity1">Charity 1</SelectItem>
                  <SelectItem value="charity2">Charity 2</SelectItem>
                  <SelectItem value="charity3">Charity 3</SelectItem>
                  <SelectItem value="charity4">Charity 4</SelectItem>
                  <SelectItem value="charity5">Charity 5</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={() => setIsSettingsDialogOpen(false)}>Save Settings</Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}